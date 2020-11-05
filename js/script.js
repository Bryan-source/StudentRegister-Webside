function listarEstudiantes(){
    var tabla = "";
    var parrafo1 = $("#p1");

    tabla += '<table border="1">';
    tabla += '<tr>';
    tabla += '<th>CODIGO</th>';
    tabla += '<th>NOMBRE</th>';
    tabla += '<th>NOTA</th>';
    tabla += '<th>Editar</th>';
    tabla += '<th>Eliminar</th>';
    tabla += '</tr>';

    for(var i=0; i < localStorage.length; i++){
        var clave = localStorage.key(i);
        var n = $.parseJSON(localStorage.getItem(clave));

        tabla += '<tr>';
        tabla += '<td>'+n.codigo+'</td>';
        tabla += '<td>'+n.nombre+'</td>';
        tabla += '<td>'+n.calificacion+'</td>';
        tabla += '<td><button onclick="editar(\''+n.codigo+'\');">Editar</button></td>';
        tabla += '<td><button onclick="eliminar(\''+n.codigo+'\');">Eliminar</button></td>';
        tabla += '</tr>';

    }
    tabla += '</table>';
    $(parrafo1).html(tabla);
    
}

function eliminar(codigo){
    localStorage.removeItem(codigo);
    listarEstudiantes();
}

function editar(codigo){
    var e;
    for(var i=0; i<localStorage.length;i++){
        var clave = localStorage.key(i);
        if(clave == codigo){
            e = $.parseJSON(localStorage.getItem(clave));
            
            $("#codigo").val(e.codigo);
            $("#nombre").val(e.nombre);
            $("#calificacion").val(e.calificacion);
        }
    }
}


$(document).ready(function(){
    $("#botonRegistrar").click(function(){
        var nombre = $("#nombre").val();
        var codigo = $("#codigo").val();
        var calificacion = $("#calificacion").val();

        var estudiante = {
            codigo:codigo,
            nombre:nombre,
            calificacion:calificacion
        };

        localStorage.setItem(codigo,JSON.stringify(estudiante));

        
        $("#nombre").val("");
        $("#codigo").val("");
        $("#calificacion").val("");

        

    });

    $("#bh").click(function(){
        localStorage.clear();
    });

    
    listarEstudiantes();
});


    
    //Función calcular promedio del estudiante
    function calcProm(){
        var suma=0;
        var prom;
        var estudiante;
        var dato;
        for(var i=0; i<localStorage.length; i++){
            var clave = localStorage.key(i);
            dato = localStorage.getItem(clave);
            estudiante = JSON.parse(dato);
            suma+=parseInt(estudiante.calificacion, 10);
        }
        prom=suma/localStorage.length;
        alert("Promedio general: "+prom.toFixed(2));

    }
    //Función Estudiante con mayor calificación
    
    function notaMayor(){
        var clave = localStorage.key(0);
        var dato = $.parseJSON(localStorage.getItem(clave));
        var mayor=parseInt(dato.calificacion, 10);
        var pos=0;
        var aux="";
        for(var i=1; i<localStorage.length;i++){
            clave = localStorage.key(i);
            dato = $.parseJSON(localStorage.getItem(clave));
            cal = parseInt(dato.calificacion);
            if(cal>mayor){
                mayor=cal;
                pos=i;
                clave = localStorage.key(pos);
                aux=mayor;
            }else{
                clave = localStorage.key(pos);
                aux=mayor;
            }
        
        }
        alert("Calificación más alta: "+aux);
    }
        //Función Estudiante con menor calificación
    function notaMenor(){
        var clave = localStorage.key(0);
        var dato = $.parseJSON(localStorage.getItem(clave));
        var menor=parseInt(dato.calificacion, 10);
        var pos=0;
        var aux="";
        for(var i=1; i<localStorage.length;i++){
            clave = localStorage.key(i);
            dato = $.parseJSON(localStorage.getItem(clave));
            cal = parseInt(dato.calificacion);
            if(cal<menor){
                menor=cal;
                pos=i;
                clave = localStorage.key(pos);
                aux=menor;
            }else{
                clave = localStorage.key(pos);
                aux=menor;
            }
        
        }
        alert("Calificación más baja: "+aux);

    }

    //---Funciones Event listener---
    //Promedio
    var promedio = document.getElementById("prom");
    promedio.addEventListener("click", prom);
    function prom(e){
        e.preventDefault();
        calcProm();
    }

    //Nota mayor
    var mayorN = document.getElementById("mayor");
    mayorN.addEventListener("click", mayor);
    function mayor(e){
        e.preventDefault();
        notaMayor();
    }

    //Nota menor
    var menorN=document.getElementById("menor");
    menorN.addEventListener("click", menor);
    function menor(e){
        e.preventDefault();
        notaMenor();
    }
