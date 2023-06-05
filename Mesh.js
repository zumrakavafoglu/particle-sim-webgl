function Mesh(vertices, indices){
    this.indicesCount = indices.length;

    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    this.setColors = function(colors){
        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    }

    this.setTextureCoordinates = function(textureCoordinates){
        this.textureCoordinateBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordinateBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    }

    this.setNormals = function(normals){
        this.normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    }
}

function loadObjMesh(objFileUrl, callback){
    loadObjMeshes([objFileUrl], function(meshes){
        callback(meshes[0]);
    });
}

function loadObjMeshes(objFileUrls, callback){
    var objInfos = {};
    for(var i=0; i<objFileUrls.length; i++){
        objInfos[i] = objFileUrls[i];
    }
    OBJ.downloadMeshes(objInfos, function(objs){
        var meshes = [];

        for(var key in objs){
            var obj = objs[key];

            var mesh = new Mesh(obj.vertices, obj.indices);

            if(obj.textures && obj.textures.length>0)
                mesh.setTextureCoordinates(obj.textures);
            if(obj.vertexNormals && obj.vertexNormals.length >0)
                mesh.setNormals(obj.vertexNormals);
                        
            meshes[parseInt(key)] = mesh;
        }

        callback(meshes);
    });
}

function createPyramidMesh(){

    var triangleVertices = [ 
        //front face
        //bottom left to right,  to top
        0.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        2.0, 0.0, 0.0,
        0.5, 1.0, 0.0,
        1.5, 1.0, 0.0,
        1.0, 2.0, 0.0,
        
        //rear face
        0.0, 0.0, -2.0,
        1.0, 0.0, -2.0,
        2.0, 0.0, -2.0,
        0.5, 1.0, -2.0,
        1.5, 1.0, -2.0,
        1.0, 2.0, -2.0
    ];

    var triangleVerticeColors = [ 
        //front face	
         0.0, 0.0, 1.0,
         1.0, 1.0, 1.0,
         0.0, 0.0, 1.0,
         0.0, 0.0, 1.0,
         0.0, 0.0, 1.0,
         1.0, 1.0, 1.0,
    
        //rear face
         0.0, 1.0, 1.0,
         1.0, 1.0, 1.0,
         0.0, 1.0, 1.0,
         0.0, 1.0, 1.0,
         0.0, 1.0, 1.0,
         1.0, 1.0, 1.0
    ];

    var triangleVertexIndices = [ 
        //front face
        0,1,3,
        1,3,4,
        1,2,4,
        3,4,5,
        
        //rear face
        6,7,9,
        7,9,10,
        7,8,10,
        9,10,11,
        
        //left side
        0,3,6,
        3,6,9,
        3,5,9,
        5,9,11,
        
        //right side
        2,4,8,
        4,8,10,
        4,5,10,
        5,10,11,

        //bottom faces
        0,6,8,
        8,2,0
    ];

    var pyramidMesh = new Mesh(triangleVertices, triangleVertexIndices);
    pyramidMesh.setColors(triangleVerticeColors);
    return pyramidMesh;
}

function createBoxMesh(){
    var vertices = [        
        //bottomFace
        -0.5,-0.5,-0.5,
        0.5,-0.5,-0.5,
        -0.5,-0.5,0.5,
        0.5,-0.5,-0.5,
        -0.5,-0.5,0.5,
        0.5,-0.5,0.5,


        //rightFace
        0.5,-0.5,-0.5,
        0.5,-0.5,0.5,
        0.5,0.5,0.5,
        0.5,-0.5,-0.5,
        0.5,0.5,0.5,
        0.5,0.5,-0.5,


        //topFace
        0.5,0.5,0.5,
        -0.5,0.5,0.5,
        0.5,0.5,-0.5,
        -0.5,0.5,0.5,
        -0.5,0.5,-0.5,
        0.5,0.5,-0.5,



        //rearFace
        -0.5,-0.5,0.5,
        0.5,-0.5,0.5,
        0.5,0.5,0.5,
        -0.5,-0.5,0.5,
        0.5,0.5,0.5,
        -0.5,0.5,0.5,



        //frontFace
        0.5,-0.5,-0.5,
        0.5,0.5,-0.5,
        -0.5,0.5,-0.5,
        -0.5,-0.5,-0.5,
        0.5,-0.5,-0.5,
        -0.5,0.5,-0.5,


        //leftFace
        -0.5,-0.5,-0.5,
        -0.5,-0.5,0.5,
        -0.5,0.5,0.5,
        -0.5,-0.5,-0.5,
        -0.5,0.5,0.5,
        -0.5,0.5,-0.5           
    ];



    var textureCoords = [
        //bottomFace
        0,0,
        1,0,
        0,1,
        1,0,
        0,1,
        1,1,

        //rightFace
        1,1,
        0,1,
        0,0,
        1,1,
        0,0,
        1,0,

        //topFace
        1,1,
        0,1,
        1,0,
        0,1,
        0,0,
        1,0,

        //rearFace
        0,1,
        1,1,
        1,0,
        0,1,
        1,0,
        0,0,

        //frontFace
        1,1,
        1,0,
        0,0,
        0,1,
        1,1,
        0,0,

        //leftFace
        1,1,
        0,1,
        0,0,
        1,1,
        0,0,
        1,0
    ];

    var indices = [];
    
    for(var i=0; i<vertices.length/3; i++){
        indices[i] = i;
    }

    var boxMesh = new Mesh(vertices, indices);
    boxMesh.setTextureCoordinates(textureCoords);
    return boxMesh;
}

function createSimpleBoxMesh(){
    var vertices = [        
        //bottomFace
        -0.5,-0.5,-0.5,
        0.5,-0.5,-0.5,
        -0.5,-0.5,0.5,
        0.5,-0.5,-0.5,
        -0.5,-0.5,0.5,
        0.5,-0.5,0.5,


        //rightFace
        0.5,-0.5,-0.5,
        0.5,-0.5,0.5,
        0.5,0.5,0.5,
        0.5,-0.5,-0.5,
        0.5,0.5,0.5,
        0.5,0.5,-0.5,


        //topFace
        0.5,0.5,0.5,
        -0.5,0.5,0.5,
        0.5,0.5,-0.5,
        -0.5,0.5,0.5,
        -0.5,0.5,-0.5,
        0.5,0.5,-0.5,



        //rearFace
        -0.5,-0.5,0.5,
        0.5,-0.5,0.5,
        0.5,0.5,0.5,
        -0.5,-0.5,0.5,
        0.5,0.5,0.5,
        -0.5,0.5,0.5,



        //frontFace
        0.5,-0.5,-0.5,
        0.5,0.5,-0.5,
        -0.5,0.5,-0.5,
        -0.5,-0.5,-0.5,
        0.5,-0.5,-0.5,
        -0.5,0.5,-0.5,


        //leftFace
        -0.5,-0.5,-0.5,
        -0.5,-0.5,0.5,
        -0.5,0.5,0.5,
        -0.5,-0.5,-0.5,
        -0.5,0.5,0.5,
        -0.5,0.5,-0.5           
    ];

    

    var colors = [
        //bottomFace
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,

        //rightFace
        1,0,0,
        1,0,0,
        1,0,0,
        1,0,0,
        1,0,0,
        1,0,0,

        //topFace
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,

        //rearFace
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,

        //frontFace
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,

        //leftFace
        1,0,0,
        1,0,0,
        1,0,0,
        1,0,0,
        1,0,0,
        1,0,0
    ];

    var normals = [
        //bottomFace
        0,-1,0,
        0,-1,0,
        0,-1,0,
        0,-1,0,
        0,-1,0,
        0,-1,0,

        //rightFace
        1,0,0,
        1,0,0,
        1,0,0,
        1,0,0,
        1,0,0,
        1,0,0,

        //topFace
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,

        //rearFace
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,

        //frontFace
        0,0,-1,
        0,0,-1,
        0,0,-1,
        0,0,-1,
        0,0,-1,
        0,0,-1,

        //leftFace
        -1,0,0,
        -1,0,0,
        -1,0,0,
        -1,0,0,
        -1,0,0,
        -1,0,0,
    ];


    var indices = [];
    
    for(var i=0; i<vertices.length/3; i++){
        indices[i] = i;
    }

    var boxMesh = new Mesh(vertices, indices);
    boxMesh.setNormals(normals);
    boxMesh.setColors(colors);
    return boxMesh;
}

function createBoxFrameMesh(){
    var vertices = [        

        -1.0, -1.0, 0.0,
        1.0, -1.0, 0.0,
        1.0, 1.0, 0.0,
        -1.0, 1.0, 0.0
      
    ];

    

    var colors = [
        //bottomFace
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,
        
    ];


    var indices = [];
    
    for(var i=0; i<vertices.length/3; i++){
        indices[i] = i;
    }

    var frameMesh = new Mesh(vertices, indices);
    frameMesh.setColors(colors);
    return frameMesh;
}

function createGroundMesh(){

    var vertices = [        
        
        -100, 0, -100,
        100, 0.0, -100.0,
        100.0, 0.0, 100.0,

        100, 0.0, 100.0,
        -100.0, 0.0, 100.0,
        -100.0, 0.0, -100.0
              
    ];

    var colors = [
        //bottomFace
        0.6,0.6,0.6,
        0.6,0.6,0.6,
        0.6,0.6,0.6,
        0.6,0.6,0.6,
        0.6,0.6,0.6,
        0.6,0.6,0.6
    ];
        
    var indices = [];
    
    for(var i=0; i<vertices.length/3; i++){
        indices[i] = i;
    }       

    var frameMesh = new Mesh(vertices, indices);
    frameMesh.setColors(colors);
    return frameMesh;
}

