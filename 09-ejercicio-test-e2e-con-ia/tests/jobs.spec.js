import { test, expect } from '@playwright/test';

test.describe('Pruebas de búsqueda y aplicación de empleos', () => {
  test('Es posible entrar en la web', async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Buscar empelos por texto desde el menú principal', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const searchInput = page.getByRole('searchbox')
    await searchInput.fill('React')

    await page.getByRole('button', { name: 'Buscar' }).click()

    const jobCard = page.locator('._jobListCard_il3es_1')

    await expect(jobCard.first()).toBeVisible()

    const firstJobTitle = jobCard.first().getByRole('heading', { level: 3 })
    await expect(firstJobTitle).toHaveText('Desarrollador de Software Senior')
  })

  test('Buscar empelos y aplicar a una oferta desde su página de detalle', async ({ page }) => {
    await page.goto('http://localhost:5173/search')

    const searchInput = page.getByRole('searchbox')
    await searchInput.fill('Javascript')

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

    await page.getByLabel('Next').click()

    const secondPageOffer = page.locator('._jobListCard_il3es_1').first()
    await expect(secondPageOffer).toContainText('AI Research Scientist')
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

