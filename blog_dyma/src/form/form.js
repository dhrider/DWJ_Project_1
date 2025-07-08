import '../assets/style/styles.scss'
import './form.scss'

const form = document.querySelector('form')
const errorElement = document.querySelector('#errors')
let errors = []

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const entries = formData.entries()
    const article = Object.fromEntries(entries)

    if (formIsValid(article)) {
        try {
            const json = JSON.stringify(article)
            const promesse = await fetch('https://restapi.fr/api/article', {
                method: 'POST',
                body: json,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const body = await promesse.json()

        } catch (e) {
            console.error(e)
        }
        
    }

})

const formIsValid = (article) => {
    if (!article.author || !article.category || !article.content || !article.img || !article.title) {
        errors.push('Vous devez renseigner tous les champs')
    } else {
        errors = []
    }
    if (errors.length) {
        let errorHTML = ''
        errors.forEach(error => {
            errorHTML += `<li>${error}</li>`
        })
        errorElement.innerHTML = errorHTML
        return false
    } else {
        errorElement.innerHTML = ''
        return true
    }
}
