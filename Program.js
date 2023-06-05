function Program(vertexShaderElementId, fragmentShaderElementId, projectionMatrixUniformName="uPMatrix", modelViewMatrixUniformName="uMVMatrix"){
    
        this.uniformLocations = {};

        var vertexShaderSource = document.getElementById(vertexShaderElementId).innerHTML;
        var fragmentShaderSource = document.getElementById(fragmentShaderElementId).innerHTML;
    
        //compile shaders	
        var vertexShader = makeShader(vertexShaderSource, gl.VERTEX_SHADER);
        var fragmentShader = makeShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    
        //create program
        this.glProgram = gl.createProgram();
    
        //attach shaders to the program
        gl.attachShader(this.glProgram, vertexShader);
        gl.attachShader(this.glProgram, fragmentShader);
    
        gl.linkProgram(this.glProgram);
    
        if (!gl.getProgramParameter(this.glProgram, gl.LINK_STATUS)) {
            alert("Unable to initialize the shader program.");
        }
    
        this.projectionMatrixUniform = gl.getUniformLocation(this.glProgram, projectionMatrixUniformName);
        this.modelViewMatrixUniform = gl.getUniformLocation(this.glProgram, modelViewMatrixUniformName); 
    
        this.setVertexPositionAttributeName = function(vertexPositionAttributeName){
            this.vertexPositionAttribute = gl.getAttribLocation(this.glProgram, vertexPositionAttributeName);
        }
        
        this.setVertexColorAttributeName = function(vertexColorAttributeName){
            this.vertexColorAttribute = gl.getAttribLocation(this.glProgram, vertexColorAttributeName);
        }
        
        this.setTextureCoordinateAttributeName = function(textureCoordinateAttributeName){
            this.textureCoordinateAttribute = gl.getAttribLocation(this.glProgram, textureCoordinateAttributeName);
        }

        this.setVertexNormalAttributeName = function(vertexNormalAttributeName){
            this.vertexNormalAttribute = gl.getAttribLocation(this.glProgram, vertexNormalAttributeName);
        }

        this.setDiffuseProductUniformName = function(diffuseProductUniformName){
            this.diffuseProductUniform = gl.getUniformLocation(this.glProgram, diffuseProductUniformName); 
        }

        this.setSpecularProductUniformName = function(specularProductUniformName){
            this.specularProductUniform = gl.getUniformLocation(this.glProgram, specularProductUniformName); 
        }

        this.setAmbientProductUniformName = function(ambientProductUniformName){
            this.ambientProductUniform = gl.getUniformLocation(this.glProgram, ambientProductUniformName); 
        }

        this.setShininessUniformName = function(shininessUniformName){
            this.shininessUniform = gl.getUniformLocation(this.glProgram, shininessUniformName); 
        }

        this.setTextureUniformName = function(textureUniformName){
            this.textureUniform = gl.getUniformLocation(this.glProgram, textureUniformName); ;
        }

        this.getUniformLocation = function(name){
            if(this.uniformLocations[name]==null){
                this.uniformLocations[name] = gl.getUniformLocation(this.glProgram, name);
            }
            return this.uniformLocations[name];
        }

        this.setUniform3fv = function (name, value){
            gl.uniform3fv(this.getUniformLocation(name), value);
        } 

        this.setUniform1f = function (name, value){
            gl.uniform1f(this.getUniformLocation(name), value);
        } 

        this.setUniform4fv = function (name, value){
            gl.uniform4fv(this.getUniformLocation(name), value);
        } 
    
        this.prepareRender = function(modelMatrix, camera){
            gl.useProgram(this.glProgram);
    
            gl.uniformMatrix4fv(this.projectionMatrixUniform, false, camera.projectionMatrix);
    
            var mvMatrix = mat4.create();
            mvMatrix = mat4.multiply(mvMatrix, camera.viewMatrix, modelMatrix);
            gl.uniformMatrix4fv(this.modelViewMatrixUniform, false, mvMatrix);
        }

        this.setPointSizeAttributeName = function(pointSizeAttributeName){
            this.pointSizeAttribute = gl.getAttribLocation(this.glProgram, pointSizeAttributeName);
        }
    
    }
                
    function makeShader(src, type){
        var shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
    
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
        }
        return shader;
    }