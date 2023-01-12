import {Viaje}  from "../models/Viaje.js";
import { Testimonial } from "../models/testimoniales.js";

const paginaInicio = async (req, res) => {/**req(lo que enviamos), res(lo que express nos responde) */

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}))
    try {
        // Consultar 3 viajes de la BD
        const resultado = await Promise.all(promiseDB) /**para consultar las 2 bases de datos al mismo tiempo */

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        })
    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros = (req, res) => {/**req(lo que enviamos), res(lo que express nos responde) */
    res.render('nosotros', {
        pagina: 'Nosotros'
    })
}

const paginaViajes = async (req, res) => {/**req(lo que enviamos), res(lo que express nos responde) */
    // Consultar BD
    const viajes = await Viaje.findAll();

    console.log(viajes);

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes,
    })
}

const paginaTestimoniales = async (req, res) => {/**req(lo que enviamos), res(lo que express nos responde) */
    try {
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        })
        
    } catch (error) {
        console.log(error);
    }
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {

    const {slug} = req.params;

    try {
        const viaje = await Viaje.findOne({where : {slug}})

        res.render('viaje', {
            parina: 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}