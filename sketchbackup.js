
var startTime = Date.now(),
    width = window.innerWidth, height = window.innerHeight, 
    scene, renderer, camera, controls
;

function init(){
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( "#5c5c5c", 0.02 );
    
    camera = new THREE.PerspectiveCamera(80, width/height, 1, 4000);
    camera.position.set(25, 25, 50);
    camera.lookAt(scene.position);
    scene.add(camera);
    
    renderer = new THREE.WebGLRenderer({
        antialias: true, 
        alpha: true,
        preserveDrawingBuffer: true
    });
    renderer.setSize(width, height);
    renderer.autoClearColor = false;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFShadowMap;
    $(renderer.domElement).appendTo("body");
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    $("body").mousemove(function(event){
        mouseX = event.pageX;
        mouseY = event.pageY;
    });
}

var sphere, boxes = [];
function setup(){  
    
    // light
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.castShadow = true;
    spotLight.position.set(50, 50, -15);
    //spotLight.shadowCameraFov = 3;
    var ambientLight = new THREE.HemisphereLight("#79ac85", "#935c8d", 0.5 );
    
    scene.add(ambientLight);
    scene.add(spotLight);
    
    addSphere();
    addPlane();    
    for(i = 0; i < 500; i++){
        boxes[i] = new Cubes();
    }
    
    var loader = new THREE.OBJLoader();
    loader.load(
        'breast.obj',
        function(object){
            object.material = new THREE.MeshLambertMaterial({color: "white"})
            object.receiveShadow = true;
            object.castShadow = true;
            scene.add(object);
            
            object.scale.set(0.05,0.05,0.05);
            object.position.x = -5;
            object.position.y = 15;
            object.position.z = 50;
        }
    );
    
}

var time;
function draw(){
    time = Date.now() - startTime;
    
    for(var i = 0; i < boxes.length; i++){
        boxes[i].draw();
    }
}

function addPlane(){
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50), 
        new THREE.MeshLambertMaterial({color: "white"})
    ); scene.add(plane);
    
    plane.rotation.x = -.5*Math.PI;
    plane.position.y = -1;
    plane.receiveShadow = true;
    
    
}

var Cubes = function(){
    //init
    this.loc = new THREE.Vector3(Math.random()*50-25, Math.random()*25, Math.random()*50-25);
    this.angle = new THREE.Euler(Math.random()*Math.PI*2,Math.random()*Math.PI*2,Math.random()*Math.PI*2);
    this.theta = Math.random()*Math.PI*2;
    
    this.addCube();
}

Cubes.prototype.addCube = function(){
    //setup
    this.cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshLambertMaterial({color: Math.random()*0xffffff })
    ); scene.add(this.cube);
    
    // position and rotation
    this.cube.position.set(this.loc.x, this.loc.y, this.loc.z);
    this.cube.rotation.set(this.angle.x, this.angle.y, this.angle.z);
    this.cube.castShadow = true;
}

Cubes.prototype.draw = function(){
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.02;
    this.cube.rotation.z += 0.03;
}

function addSphere(){
    sphere = new THREE.Mesh(
        new THREE.SphereGeometry(2, 64, 64), 
        new THREE.MeshNormalMaterial({color: "#79a0ac"})); scene.add(sphere);
    
    sphere.position.y = 15;
}
    
function createShaderMaterial( id, light, ambientLight ) {
    var shader = THREE.ShaderToon[ id ];
    var u = THREE.UniformsUtils.clone( shader.uniforms );
    var vs = shader.vertexShader;
    var fs = shader.fragmentShader;
    var material = new THREE.ShaderMaterial( { uniforms: u, vertexShader: vs, fragmentShader: fs } );
    material.uniforms.uDirLightPos.value = light.position;
    material.uniforms.uDirLightColor.value = light.color;
    material.uniforms.uAmbientLightColor.value = ambientLight.color;
    return material;
}
				 

function render(){
    requestAnimationFrame(render);
    draw();
    renderer.render(scene, camera);
}

$(window).resize(function(){
    width = window.innerWidth;
    height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
});

init();
setup();
render();