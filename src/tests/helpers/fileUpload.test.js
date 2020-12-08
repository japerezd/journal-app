import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'dumihjct9', 
    api_key: '378127813585878', 
    api_secret: 'Tg7NQFcyb1aQP4u4mYLiVuzSgLk' 
  });

describe('Pruebas en fileUpload', () => {
    
    test('debe de cargar un archivo y retornar el url', async(done) => {
        
        const resp = await fetch('https://upload.wikimedia.org/wikipedia/commons/b/b8/Lesser_antillean_bird3.jpg');
        const blob = await resp.blob();


        const file = new File([blob],'foto.png');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');
        // Borrar la imagen por ID
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg','');

        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done();
        });
    })
    
    test('debe de retornar un error', async() => {

        const file = new File([],'foto.png');
        const url = await fileUpload(file);
        expect(url).toBe(null);

    })
})
