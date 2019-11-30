//# Spherical Harmonics Mesh Builder
//Rendered with [THREE.js](http://threejs.org)

//Demonstrates how to use the `toxi.geom.mesh.SurfaceMeshBuilder` class
//in conjunction with a spherical harmonics function to dynamically create a variety
//of organic looking forms. The function is described in detail on
//[Paul Bourke's website](http://paulbourke.net/geometry/sphericalh/).

//I like this one [4, 2, 4, 6, 4, 0, 1, 1]

var container = document.getElementById('threegraph'),
    stage = new toxi.geom.Vec2D(container.offsetWidth, container.offsetHeight),
    camera = new THREE.PerspectiveCamera(45, stage.x / stage.y, 1, 2000),
    scene = new THREE.Scene(),
    renderer = new THREE.WebGLRenderer({ antialias: true }),
    options,
    material,
    threeMesh; //<--we'll put the converted mesh here

//set the scen
container.style.backgroundColor = "#c3c8d2"
camera.position.z = 600;
scene.add(camera);
renderer.setSize(stage.x, stage.y);
container.appendChild(renderer.domElement);
//add the rotation controls
var controls = new THREE.TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.2;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = false;
controls.dynamicDampingFactor = 0.1;

material = new THREE.MeshNormalMaterial({  opacity: 1.0 });
material.side = THREE.FrontSide;


options = {
    zoom: 80,
    meshResolution: 100,
    values: {
        vector: [4, 2, 4, 6, 4, 0, 1, 1],
        l: 25,
        m: 2
    },
    updateMesh: function (res) {
        var sh, builder, toxiMesh, threeGeometry;
        if (res === undefined) {
            res = options.meshResolution;
        }
        if (threeMesh !== undefined) {
            scene.remove(threeMesh);
        }

        sh = new SphericalHarmonics(options.values);
        builder = new toxi.geom.mesh.SurfaceMeshBuilder(sh);
        toxiMesh = builder.createMesh(new toxi.geom.mesh.TriangleMesh(), res, 1, true);
        threeGeometry = toxi.THREE.ToxiclibsSupport.createMeshGeometry(toxiMesh);
        threeMesh = new THREE.Mesh(threeGeometry, material);
        threeMesh.scale.set(options.zoom, options.zoom, options.zoom);
        scene.add(threeMesh);
    }
};


options.updateMesh();
animate();
function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    controls.update();
    renderer.render(scene, camera);
}
