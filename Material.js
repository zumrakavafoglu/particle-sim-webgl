function Material(program){
    this.program = program;

    this.diffuseColor = [1.0 , 1.0 , 1.0 , 1.0];
    this.specularColor = [1.0 , 1.0 , 1.0 , 1.0];
    this.ambientColor = [1.0 , 1.0 , 1.0 , 1.0];
    this.shininess = 1;

    this.draw = function(mesh, modelMatrix, camera, drawMode = gl.TRIANGLES){
        this.program.prepareRender(modelMatrix, camera);

        this.sendLightInfo(camera);
        
        if(mesh.colorBuffer!=null && this.program.vertexColorAttribute!=null){
            gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorBuffer);        
            gl.enableVertexAttribArray(this.program.vertexColorAttribute);
            gl.vertexAttribPointer(this.program.vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);
        }

        if(mesh.textureCoordinateBuffer!=null && this.program.textureCoordinateAttribute!=null){
            
            if(this.texture){
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this.texture.textureId);
                gl.uniform1i(this.program.textureUniform, 0);
            }

            gl.enableVertexAttribArray(this.program.textureCoordinateAttribute);
            gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureCoordinateBuffer);
            gl.vertexAttribPointer(this.program.textureCoordinateAttribute, 2, gl.FLOAT, false, 0, 0);
        }
        
        if(mesh.normalBuffer!=null && this.program.vertexNormalAttribute!=null){
            gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);        
            gl.enableVertexAttribArray(this.program.vertexNormalAttribute);
            gl.vertexAttribPointer(this.program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
        }
        
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);        
        gl.enableVertexAttribArray(this.program.vertexPositionAttribute);
        gl.vertexAttribPointer(this.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);  
        gl.drawElements(drawMode, mesh.indicesCount, gl.UNSIGNED_SHORT, 0);
    }

    this.sendLightInfo = function(camera){
        if(window.light){
            window.light.sendLightTransformInfo(camera, this.program);

            if(this.program.diffuseProductUniform!=null){
                gl.uniform4fv(this.program.diffuseProductUniform, math.dotMultiply(window.light.diffuseColor, this.diffuseColor));
            }
            if(this.program.ambientProductUniform!=null){
                gl.uniform4fv(this.program.ambientProductUniform, math.dotMultiply(window.light.ambientColor, this.ambientColor));
            }
            if(this.program.specularProductUniform!=null){
                gl.uniform4fv(this.program.specularProductUniform, math.dotMultiply(window.light.specularColor, this.specularColor));
            }
            if(this.program.shininessUniform!=null){
                gl.uniform1f(this.program.shininessUniform, this.shininess);
            }
        }
    }

    this.setTexture = function(texture){
        this.texture = texture;
    }
}