const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const FileType = require('file-type');

async function UguuSe(filePath) {
	return new Promise(async (resolve, reject) => {
		try {
			const form = new FormData();
			const fileType = await FileType.fromFile(filePath);
			const ext = fileType ? fileType.ext : 'bin';
			form.append('files[]', fs.createReadStream(filePath), { filename: 'data.' + ext });
			const data = await axios.post('https://uguu.se/upload.php', form, {
				headers: {
					...form.getHeaders()
				}
			})
			resolve(data.data.files[0])
		} catch (e) {
			reject(e)
		}
	})
}

module.exports = { UguuSe }
