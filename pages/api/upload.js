import multiparty from 'multiparty'

export default async function handler(req, res) {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        console.log(files.length)
        res.json('ok')
    })
}

export const config = {
    api: {bodyParse: false}
}