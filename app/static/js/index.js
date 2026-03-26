
$(document).ready(function(){
    
    $.get("/municipios", function(data){
        data.forEach(function(mun){
            $("#municipio").append(
                "<option value='" + mun + "'>" + mun + "</option>"
            );
        });
    });
    $.get("/niveles", function(data){
        data.forEach(function(niv){
            $("#nivel").append(
                "<option value='" + niv + "'>" + niv + "</option>"
            );
        });
    });
    $.get("/asuntos", function(data){
        data.forEach(function(asu){
            $("#asunto").append(
                "<option value='" + asu + "'>" + asu + "</option>"
            );
        });
    });


});

document.addEventListener('DOMContentLoaded', e=> {

    const form = document.getElementById("form")
    const parrafo = document.getElementById("warnings")
    const reCurp = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/;
    const reCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const reTelefono = /^\d{10}$/;

    form.addEventListener("submit", e=>{
        e.preventDefault()
        parrafo.innerHTML = "";

        const nombre = document.getElementById("nombre").value.trim();
        const curp = document.getElementById("curp").value.trim();
        const nombre1 = document.getElementById("nombre1").value.trim();
        const paterno = document.getElementById("paterno").value.trim();
        const materno = document.getElementById("materno").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const celular = document.getElementById("celular").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const nivel = document.getElementById("nivel").value.trim();
        const municipio = document.getElementById("municipio").value.trim();
        const asunto = document.getElementById("asunto").value.trim();

        let warnings = ""
        let entrar = false
        if (!nombre){
            warnings += 'El campo Nombre Completo es obligatorio <br>'
            entrar = true
        } 
        if (!curp){
            warnings += 'El campo Curp es obligatorio <br>'
            entrar = true
        }
        else if (!reCurp.test(curp)){
            warnings += 'El formato del campo curp es incorrecto <br>'
            entrar = true
        }
        if (!nombre1){
            warnings += 'El campo nombre es obligatorio <br>'
            entrar = true
        } 

        if (!paterno){
            warnings += 'El campo Paterno es obligatorio <br>'
            entrar = true
        } 
        if (!materno){
            warnings += 'El campo materno es obligatorio <br>'
            entrar = true
        } 
        if (!telefono){
            warnings += 'El campo telefono es obligatorio <br>'
            entrar = true
        }
        else if (!reTelefono.test(telefono)){
            warnings += 'El formato del campo telefono es incorrecto <br>'
            entrar = true
        }
        if (!celular){
            warnings += 'El campo Celular es obligatorio <br>'
            entrar = true
        }
        else if (!reTelefono.test(celular)){
            warnings += 'El formato del campo Celuelar es incorrecto <br>'
            entrar = true
        } 

        if (!correo){
            warnings += 'El campo correo es obligatorio <br>'
            entrar = true
        }
        else if (!reCorreo.test(correo)){
            warnings += 'El formato del campo Correo es incorrecto <br>'
            entrar = true
        }

        if (nivel == ''){
            warnings += 'Por favor seleccione un nivel <br>'
            entrar = true
        }

        if (municipio == ''){
            warnings += 'Por favor seleccione un municipio <br>'
            entrar = true
        }
        if (asunto == ''){
            warnings += 'Por favor seleccione un Asunto <br>'
            entrar = true
        }


        if(entrar){
            parrafo.innerHTML= warnings
        }
        else{
            let datos ={
                nombre_comp: nombre,
                curp: curp,
                nombre: nombre1,
                paterno: paterno,
                materno: materno,
                telefono: telefono,
                celular: celular,
                correo: correo,
                id_nivel: 1,
                id_municipio: 1,
                id_asunto: 1
            }
            console.log("JSON enviado: ", datos)

            $.ajax({
                url: "/turno",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(datos),
                success: function(respuesta){
                    console.log("Servidor responde: ", respuesta)
                    alert("Turno creado exitosamente")
                },
                error: function(error){
                    console.error("error del seridor", error)
                    alert("Ocurrio un error al guardar el turno.")
                }
            })
        }
    })

})
