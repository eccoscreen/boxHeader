var scene, camera, renderer;
var width = $("header").width();
var height = $("header").height();

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    //renderer.setSize( width, height );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMapEnabled = true;
    $(renderer.domElement).appendTo("header");
    //document.body.appendChild( renderer.domElement );
}
init();

/////////
var cube, mouseX, mouseY;

function setup(){
    // plane
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 20),
        new THREE.MeshLambertMaterial({color: 0xffffff})
    );
    plane.receiveShadow = true;
    plane.rotation.x=-0.5*Math.PI;
    plane.position.set(0, -0.4, 0);
    //scene.add(plane);

    // box
    for(var i = 0; i < 500; i++){
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshLambertMaterial( { color: "#a4caea" } );
        cube = new THREE.Mesh( geometry, material );
        cube.castShadow = true;
        cube.position.set(
            Math.random()*100-50, 
            Math.random()*100-50, 
            Math.random()*100-50
        );
        cube.rotateX(Math.random()*Math.PI*2);
        cube.rotateY(Math.random()*Math.PI*2);
        cube.rotateZ(Math.random()*Math.PI*2);
        scene.add( cube );
    }

    // sphere
    var sphereMaterial = 
        new THREE.MeshLambertMaterial( { color: 0xCC0000 });
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(300, 16, 16),
        sphereMaterial
    );
    scene.add(sphere);

    // create a point light
    var pointLight =
      new THREE.SpotLight(0xFFFFFF);
    pointLight.position.set(0, 300, 200);
    pointLight.castShadow = true;
    scene.add(pointLight);

    //camera
    scene.add(camera);
    camera.position.z = 5;
    camera.position.y = 2;
    camera.lookAt(plane.position);
    mouseY = 0;
}
setup();

$("body").mousemove(function( event ){
        mouseX = event.pageX;
        mouseY = event.pageY;
});

function render() {
	requestAnimationFrame( render );

	//cube.rotation.x += 0.01;  
    camera.position.y = mouseY / 100;
	renderer.render( scene, camera );
}
render();

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
  width = $("header").width();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );

}