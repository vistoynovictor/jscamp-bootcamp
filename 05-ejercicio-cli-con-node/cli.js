import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { argv } from 'node:process'

// Initial variables
const FLAGS = {
  type: {
    ordering: ['--asc', '-a', '--desc', '-d'],
    filtering:['--files', '-fi', '--folders', '-fo']
  },
  usage: `Invalid Flag

----------- ALLOWED FLAGS -----------
--asc     || -a   ->  Ascending order
--desc    || -d   ->  Descending Order
--files   || -fi  ->  Show files only
--folders || -fo  ->  Files only`
}

// Recogiendo los argumentos
if (!process.permission){
  console.log('Permision should be enable\nuse flag [--permission]')
  process.exit(1)
}

const args = process.argv.slice(2)
let dir = !args[0] || args[0].includes('-') ? '.' : args[0]
let ordering
let filtering



const isLocationOnly = args.length <= 1 && !args[0]?.includes('-')

if (!isLocationOnly) args.map(arg => {
  if(arg === dir) return

  if (FLAGS.type.ordering.includes(arg)){
    if (ordering) return

    ordering = arg === '-a' || arg === '--asc' ? 1 : -1
    return
  }

  if (FLAGS.type.filtering.includes(arg)){
    if(filtering) return

    filtering = arg === '-fi' || arg === '--files' ? 1 : -1
    return
  }

  console.log(FLAGS.usage)
  process.exit(1)
})



// Formateo de bites
const formatBytes = size => {

  if (size < 1024) return `${size}B`

  return `${ size / 1024 }KB`
}

// Creando datos para output (entries)
const files = await readdir(dir).catch(() => {
    console.log('Invalid path provided')
    process.exit(1)
  })

let entries = await Promise.all(
  files.map(async (name) => {

    const fullPath = join(dir, name)
    const info = await stat(fullPath)

    return {
      name,
      isDir: info.isDirectory(),
      size: formatBytes(info.size)
    }
  })
)

// Ordenando entries

function onSorting(a, b){
  if(a.isDir !== b.isDir){
    return a.isDir ? -1 : 1
  }

  return a.name.localeCompare(b.name) * ordering;
}

if (ordering) entries = entries.sort(onSorting)

//Filtrando entries
if (filtering) entries = entries.filter(entry => 
  filtering === 1
    ? !entry.isDir
    : entry.isDir
)

// Decorando entries
function print(entry){
  const icon = entry.isDir ? '📁' : '📄'
  const size = entry.isDir ? '-' : entry.size

  console.log(`${icon} ${entry.name.padEnd(25)} [${size}]`)
}
entries.map(entry => print(entry))
