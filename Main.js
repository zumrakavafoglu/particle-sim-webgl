

window.init = function(){
    var camera = new Camera();
    camera.position = [0.0, 0, -6];
    camera.lookAt = [0.0, -1.0, 0.0];

    var program1 = new Program('particle-vs', 'particle-fs');
    program1.setVertexPositionAttributeName("aVertexPosition");
    program1.setVertexColorAttributeName("aVertexColor");
    program1.setPointSizeAttributeName("aPointSize");

    var groundHeight = -1;
    var particleSystem1 = new ParticleSystem(program1 , 1000, [0,0,0], [0,1,0], groundHeight, [3,1,3], true, 5, 10);

    var program2 = new Program('color-vs', 'color-fs');
    program2.setVertexPositionAttributeName("aVertexPosition");
    program2.setVertexColorAttributeName("aVertexColor");

    var material1 = new Material(program2);

    var frame = new SceneObject(createGroundMesh(), material1);
    frame.localPosition = [0,groundHeight,0];


}

window.update = function(){
    window.mainCamera.update();

    drawSceneObjects();
    drawParticleSystems();
}
