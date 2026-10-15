const form = document.getElementById('urlForm')

const orignalUrlInput = document.getElementById("url")
const message = document.getElementById("message")
const result = document.getElementById("result")

form.addEventListener('submit', async event => {
    event.preventDefault()
    // message.textContent = ""
 message.textContent = '';
    result.innerHTML = '';

    try {
        console.log('buttonnnnn')
        const response = fetch('http://localhost:8000/api/url',{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json',
          },     
          body : JSON.stringify({
            orignalUrl : orignalUrlInput.value.trim()
          })
        })
        const data = response.json()

        if(!response.ok){
            message.textContent = data.error || 'something wrong'
        }
        message.textContent = 'Short URL created successfully!';

        // Create the shortened URL link
        const link = document.createElement('a');
        link.href = data.shortUrl;
        link.textContent = data.shortUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        // Display it on the frontend
        result.appendChild(link);

    //    form.reset()
    } catch (error) {
        
        
    }
})