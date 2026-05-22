import { test, expect } from '@playwright/test';

test.describe('Pruebas de búsqueda y aplicación de empleos', () => {
  test('Es posible entrar en la web', async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Buscar empelos por texto desde el menú principal', async ({ page }) => {
    await page.goto('http://localhost:5173')

    // Si agregamos un label o `aria-label` al input de búsqueda, podemos usar `getByLabel`
    // const searchInput = page.getByLabel('Buscar empleo por titulo, habilidad o empresa')
    const searchInput = await page.getByRole('searchbox')
    await searchInput.fill('React')

    await page.getByRole('button', { name: 'Buscar' }).click()

    // Siempre es mejor buscar por selectores de rol, en estos casos, lo que podemos hacer es:
    const jobCard = page.getByRole('article')
    // const jobCard = page.locator('._jobListCard_il3es_1')

    await expect(jobCard.first()).toBeVisible()

    const firstJobTitle = jobCard.first().getByRole('heading', { level: 3 })
    // En vez de hacer un expect por el texto, que puede cambiar según lo que busques, podemos observar que existe el título de la oferta
    // await expect(firstJobTitle).toHaveText('Desarrollador de Software Senior')
  })

  test('Buscar empelos y aplicar a una oferta desde su página de detalle', async ({ page }) => {
    await page.goto('http://localhost:5173/search')

    const searchInput = page.getByRole('searchbox')
    await searchInput.fill('Javascript')

    // Lo mismo que en el test anterior, podemos usar el selector de rol. Siempre debemos evitar usar selectores de clase o ID, estos pueden cambiar fácil con el tiempo.
    const jobCard = page.locator('._jobListCard_il3es_1')

    const firstJobTitle = jobCard.first().getByRole('heading', { level: 3 })
    await expect(firstJobTitle).toHaveText('Desarrollador de Software Senior')
    await jobCard.first().getByRole('link').click()

    await page.getByRole('button', { name: 'Iniciar sesión' }).click()

    const applyButton = page.getByRole('button', { name: 'Aplicar' }).first()
    await applyButton.click()

    page.getByRole('button', { name: 'Aplicado' }).first()
  })
})

test.describe('Pruebas de sección de filtros', () => {
  test('Verificar filtro Ubicación', async ({ page }) => {
    await page.goto('http://localhost:5173/search')

    const locationFilter = page.getByLabel('location')
    await locationFilter.selectOption('Remoto')

    const jobCards = page.locator('._jobListCard_il3es_1')
    const cardCount = await jobCards.count()

    for (let i = 0; i < cardCount; i++) {
      expect(jobCards.nth(i)).toContainText('Remoto')
    }
  })

  test('Verificar filtro Experiencia', async ({ page }) => {
    await page.goto('http://localhost:5173/search')

    const locationFilter = page.getByLabel('experience')
    await locationFilter.selectOption('Senior')

    const jobCards = page.locator('._jobListCard_il3es_1')

    await expect(jobCards).toContainText([
      "Desarrollador de Software",
      "Product",
      "Ingeniero de Machine",
      "Full Stack",
    ])
  })

  test('Verificar paginación', async ({ page }) => {
    await page.goto('http://localhost:5173/search')

    const filter = page.getByLabel('tech')
    await filter.selectOption('Python')

    const firstPageOffer = page.locator('._jobListCard_il3es_1').first()
    await expect(firstPageOffer).toContainText('Ingeniero de Machine Learning')

    // Podemos obtener primero por `getByRole` el nav, y de ahí el link a la siguiente página
    // const navigate = page.getByRole('navigation', { name: 'Pagination' })
    // await navigate.getByRole('link', { name: 'Next' }).click()
    await page.getByLabel('Next').click()

    const secondPageOffer = page.locator('._jobListCard_il3es_1').first()
    await expect(secondPageOffer).toContainText('AI Research Scientist')

    // Otra manera de verificarlo es comparando de que la URL cambie
    // await expect(page).toHaveURL(/page=2/)
    // O viendo que el firstPageOffer y secondPageOffer son diferentes
  })

  test('Verificar botón Aplicar en página de detalle', async ({ page }) => {
    await page.goto('http://localhost:5173/search')

    const firstOffer = page.locator('._jobListCard_il3es_1').getByRole('link').first()
    await firstOffer.click()

    const logginButton = page.getByRole('button', { name: 'Iniciar sesión' }).first()
    await logginButton.click()

    const applyButton = page.getByRole('button', { name: 'Aplicar' }).first()
    await applyButton.click()

    page.getByText('Aplicado').first()
    page.getByText('Aplicado').nth(1)
  })
})

