
var startTime = Date.now(),
    width = window.innerWidth, height = window.innerHeight, 
    scene, renderer, camera, controls, stats, mousex, mouseY
;

var colors = [
    {
      "color" : 'white',
    },
    {
      "color" : '#6f2020',
    },
    {
      "color" : '#004eff',
    },
    {
      "color" : 0x000066,
    },
    {
      "color" : 0x3333FF,
    },
    {
      "color" : 0x3333FF,
    },
    {
      "color" : 0x3399FF,
    },
    {
      "color" : 0x3399FF,
    }, 
    {
      "color" : 0x33FFFF,
    },
    {
      "color" : 0x33FFFF,
    },
    {
      "color" : 0xCCFFFF,
    },
    {
      "color" : 0xCCFFFF,
    }              

];

function init(){
    scene = new THREE.Scene();
    //scene.fog = new THREE.FogExp2( "#5c5c5c", 0.02 );
    
    camera = new THREE.PerspectiveCamera(15, width/height, 1, 4000);
    camera.position.set(0, 3.5, 5);
    camera.lookAt(scene.position);
    scene.add(camera);
    
    renderer = new THREE.WebGLRenderer({
        antialias: true, 
        alpha: true,
        //preserveDrawingBuffer: true
    });
    renderer.setSize(width, height);
    renderer.autoClearColor = false;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFShadowMap;
    $(renderer.domElement).appendTo("body");
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    // stats js
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    $(stats.domElement).appendTo("body");
    
    
}

function setup(){  
    // light
    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.castShadow = true;
    light.position.set(50, 50, -15);
    //spotLight.shadowCameraFov = 3;
    var ambientLight = new THREE.AmbientLight("#313f40");
    
    scene.add(light);
    scene.add(ambientLight);
    
    addCube();
}

var cube;
function addCube(){
    cube = new THREE.Mesh(
        new THREE.BoxGeometry(3, 5, 5),
        new THREE.MeshLambertMaterial({
            //wireframe: true,
            color: '#d1e7fa',
            vertexColors: THREE.FaceColors
        })
    ); 
    
    for (i=0; i < cube.geometry.faces.length; i+=2) {
        var color = new THREE.Color(colors[ i ].color);
        cube.geometry.faces[ i ].color = color;
        cube.geometry.faces[ i + 1].color = color;
    };
    
    var edges = new THREE.EdgesHelper( cube, '#5c5c5c' );
    scene.add(cube);
    scene.add(edges);
}

var time;
function draw(){
    time = Date.now() - startTime;
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    camera.position.x += (mouseX - camera.position.x) * 0.05;
	camera.position.y += (- mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
}

function render(){
    requestAnimationFrame(render);
    stats.begin();
    draw();
    stats.end();
    renderer.render(scene, camera);
}

$(window).resize(function(){
    width = window.innerWidth;
    height = window.innerHeight;
    $('canvas').css({'width': width, 'height': height}); 
    
//    camera.aspect = width / height;
//    camera.updateProjectionMatrix();
//    
//    renderer.setSize(width, height);
});


$("body").mousemove(function(event){
        mouseX = (event.clientX - width/2) / 100;
        mouseY = (event.clientY - height/2) / 100;
});

init();
setup();
render();