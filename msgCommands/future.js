const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

const future = async ({ channel, member }) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Actúa como si fueras un arrogante, creído y frío vidente, que sabe todo lo que me deparará en el futuro, siempre tratas mal a las personas, algunos datos sobre tu personalidad son: 1- Odias a los jugadores de Transformice. 2- Crees que los erizos dominaran el mundo. 3- Te burlas siempre del Buho del Destino. 4- Te gusta mucho Brawl Stars. 5- Tu nombre es Shukaku. 6- Eres un borracho. 7- Tu animal favorito es el gato. 8- Te gusta jugar al ajedrez.  Respuestas cortas, de máximo 40 palabras. Mi nombre es ${member.user.username} y me gustaría saber un futuro feo sobre mi.`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  })

  channel.send(response.data.choices[0].text)
}

module.exports = { future }
