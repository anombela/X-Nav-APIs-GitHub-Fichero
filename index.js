jQuery(document).ready(function() { 

    $("#formRepo").hide();
    $("#BTNescribir").hide();
    $("#formFichero").hide();
    $("#CogerToken").click(cogerToken);
    $("#CogerRepo").click(cogerRepo);
    $("#BTNescribir").click(function() {
        $("#formFichero").show();
    });
    $("#CogerTexto").click(escribirFichero);
});

var github;
var repo;

function cogerToken(){
    var token = $("#token").val();
    github = new Github({
        token: token,
        auth: "oauth"
    });
    $("#formRepo").show();
}

function cogerRepo(){
    var username = $("#NombreUsuario").val();
    var reponame = $("#NombreRepo").val();
    repo = github.getRepo(username, reponame);
    repo.show(mostrarRepo);
}

function mostrarRepo(err, repo) {
    var infoRepo = $("#infoRepo");
    if(err){
        infoRepo.html("Ha habido un error!<br>"+err);
    }else{
        infoRepo.html("<p>Datos del repositorio:</p><ul><li>Descripción del repositorio: " + repo.description + "</li>" + "<li>Fecha de creación: " + repo.created_at + "</li>" + "<li>Nombre completo: " + repo.full_name + "</li></ul>")
    }
    $("#BTNescribir").show();
}

function escribirFichero() {
    var nombreFichero = $("#NombreFichero").val();
    var contenidoFichero = $("#ContenidoFichero").val();
    var mensajeCommit = $("#MensajeCommit").val();
    console.log(nombreFichero);
    console.log(contenidoFichero);
    console.log(mensajeCommit);
    repo.write('master', nombreFichero, contenidoFichero, mensajeCommit,                function(err) {
        if(!err){
            $("#formFichero").html($("#formFichero").html() + "<p>Realizado con éxito.</p>");
        }else{
            $("#formFichero").html($("#formFichero").html() + "<p>error:" + err + "</p>");
    }});
};
