//patrón modular
let iframeGlobal = (() =>{
    let inyectarTodo = (url, id) => {
        id.setAttribute('src', url);
        id.style.display = 'block';
    };
    return {
    mostrarTodo: (url, id) => inyectarTodo(url, id),
};
})();

//súper clase
class Multimedia {
    constructor(url) {
        let _url = url;
        this.getUrl = () => _url;
        this.setUrl = (nuevo_url) => _url = nuevo_url;
    }

    get url() {
        return this.getUrl();
    }

    //metodo set inicio
    setInicio() {
        console.log(`Este método es para realizar un cambio en la URL del video`);
    }
}
//clase hija Reproductor
class Reproductor extends Multimedia {
    constructor(url, id) {
        super(url);
        this.id = id;

    }
    //polimorfismo
    // método para modificar el tiempo de inicio
    setInicio(_tiempo = 10) {
        return this.getUrl() + `?start=${_tiempo}`;
    }

    //método playmultimedia
    //llamamos a la función iframe
    playMultimedia() {
        //console.log("holito")
        document.getElementById(this.id).innerHTML = `
        <iframe width="560" height="315" src="${this.setInicio()}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        
    }
}
//switch 
document.querySelectorAll(".btn").forEach((boton) => {
    const buttonId = boton.getAttribute('id');
    const tipo = boton.getAttribute("data-tipo");
    let url = '';
    switch(tipo) {
        case 'musica':
            url = "https://www.youtube.com/embed/7jMlFXouPk8";
        break;
        case 'peliculas':
            url = "https://www.youtube.com/embed/PeHyaasLWPw";
        break;
        case 'series':
            url = "https://www.youtube.com/embed/jf9a2ADB8-0";
        break;
    }
    //llamamos a objeto con url y tipo
    document.querySelector("#"+buttonId).addEventListener("click", () => {
        const obj = new Reproductor(url, tipo);
        obj.setInicio(10);
        obj.playMultimedia();
    })
})