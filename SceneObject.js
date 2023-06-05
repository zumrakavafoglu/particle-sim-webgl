function SceneObject(mesh, material){
    
        this.localPosition = [0, 0, 0];
        this.localEulerAngles = [0, 0, 0];
    
        this.modelMatrix = mat4.create();
    
        this.mesh = mesh;
        this.material = material;

        this.drawMode = gl.TRIANGLES;
        
        window.sceneObjects.push(this);
    
        this.render = function(camera = window.mainCamera){
            this.calculateModelMatrix();
    
            this.material.draw(this.mesh, this.modelMatrix, camera, this.drawMode);
        }
    
        this.calculateModelMatrix = function(){
    
            mat4.identity(this.modelMatrix);
            
            mat4.translate(this.modelMatrix, this.modelMatrix, this.localPosition);    
            mat4.rotateZ(this.modelMatrix, this.modelMatrix, this.localEulerAngles[2]*(Math.PI / 180));       
            mat4.rotateY(this.modelMatrix, this.modelMatrix, this.localEulerAngles[1]*(Math.PI / 180));      
            mat4.rotateX(this.modelMatrix, this.modelMatrix, this.localEulerAngles[0]*(Math.PI / 180));    
    
            if(this.parent){
                //TODO:Recalculates parent model matrix for every child. Can be optimized.
                this.modelMatrix = mat4.multiply(this.modelMatrix, this.parent.calculateModelMatrix(), this.modelMatrix);
            }
    
            return this.modelMatrix;
        }
        
    }
    
    function drawSceneObjects(){
        for(var i=0; i<window.sceneObjects.length; i++){
            window.sceneObjects[i].render();
        }
    }

    if(!window.sceneObjects){
        window.sceneObjects = [];
    }