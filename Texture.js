function Texture(url){
    
        this.textureId = gl.createTexture();
    
        gl.bindTexture(gl.TEXTURE_2D, this.textureId);
        // Fill the texture with a 1x1 blue pixel.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
    
        // let's assume all images are not a power of 2
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    
        var textureInfo = {
            width: 1,   // we don't know the size until it loads
            height: 1,
            textureId: this.textureId
        };
    
        var img = new Image();
        img.crossOrigin = ""; 
        
        img.addEventListener('load', function() {
            textureInfo.width = img.width;
            textureInfo.height = img.height;
        
            gl.bindTexture(gl.TEXTURE_2D, textureInfo.textureId);
            //Fill the texture with the given image
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            // gl.generateMipmap(gl.TEXTURE_2D);
        });
    
        img.src = url;
    
    }