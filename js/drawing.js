var parameters = { l: 2, m: 2, ri: "real", positivo: true, negativo: true }

var container = document.getElementById('threegraph'),
    stage = new toxi.geom.Vec2D(container.offsetWidth, container.offsetHeight),
    camera = new THREE.PerspectiveCamera(45, stage.x / stage.y, 1, 1000),
    scene = new THREE.Scene(),
    renderer = new THREE.WebGLRenderer({ antialias: true }),
    material,
    threeMesh;

//set the scen
container.style.backgroundColor = "#c3c8d2"
camera.position.z = 500;
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

material = new THREE.MeshNormalMaterial({ opacity: 1.0 });
material.side = THREE.DoubleSide;
const zoom = 80
const meshResolution = 100
function updateMesh(res) {
    var sh, builder, toxiMesh, threeGeometry;
    if (threeMesh !== undefined) {
        scene.remove(threeMesh);
    }

    sh = new SphericalHarmonics(parameters);
    builder = new toxi.geom.mesh.SurfaceMeshBuilder(sh);
    toxiMesh = builder.createMesh(new toxi.geom.mesh.TriangleMesh(), meshResolution, 1, true);
    threeGeometry = toxi.THREE.ToxiclibsSupport.createMeshGeometry(toxiMesh);
    threeMesh = new THREE.Mesh(threeGeometry, material);
    threeMesh.scale.set(zoom, zoom, zoom);
    scene.add(threeMesh);
}

updateMesh();
animate();
function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    controls.update();
    renderer.render(scene, camera);
}
