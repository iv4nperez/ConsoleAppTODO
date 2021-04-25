const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr(){
        const listado = [];
        
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });
    
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id ='' ){

        if(this._listado[id]){
        
            delete this._listado[id];
            
        }

    }

    cargarTareasFromArray(  tareas = [] ){
        
        tareas.forEach(tarea => {

            this._listado[tarea.id] = tarea;

        });
        
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    }


    listadoCompleto(){

        console.log();
        this.listadoArr.map(( element, index ) => {

            //console.log(`${ index + 1 }`.green `${element.desc} ${element.completadoEn != null ? 'completado' : 'pendiente'}`);
            let item = `${index + 1 }.`.green + ` ${element.desc} :: ${element.completadoEn != null 
                                                                    ? 'Completado'.green 
                                                                    : 'Pendiente'.red }`;
            console.log(item);
        });

    }

    listarPendientesCompletadas( completadas = true ){

        console.log();
        let contador = 0;
        this.listadoArr.forEach(( element ) => {

            const { desc , completadoEn } = element;
            const estado = ( completadoEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red

            if( completadas ){
                
                if( completadoEn ){
                    contador += 1;
                    console.log(`${ (contador + '.').toString().green } ${ desc } :: ${ completadoEn.green }`)
                }
            
            }else{

                if( !completadoEn ){
                        contador += 1;
                        console.log(`${ (contador + '.').toString().green }. ${ desc } :: ${ estado }`)
                    }
                }
        });

    }

    toggleCompletadas(ids = []){

        ids.forEach(id => {

            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }

        });


        this.listadoArr.forEach(tarea => {

            if( !ids.includes(tarea.id)){
               this._listado[tarea.id].completadoEn = null;
            }

        });

    }


}
module.exports = Tareas;


