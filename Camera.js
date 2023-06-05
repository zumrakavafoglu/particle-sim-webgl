window.globalUp = [0, 1, 0];

function Camera(){
    window.mainCamera = this;

    this.position = [0, 0, 0];
    this.lookAt = [0, 0, 0];

    this.near = 0.1;
    this.far = 100.0;
    this.fieldOfViewY = 45;
    this.aspect = canvas.width / canvas.height;

    this.viewMatrix = mat4.create(),
    this.projectionMatrix = mat4.create();
    
    this.update = function(){
        this.clearScene();
        this.viewMatrix = this.calculateViewMatrix(this.lookAt, this.position, window.globalUp); 
    }

    this.clearScene = function(){
        gl.clearColor(0.0, 0.0, 0.0, 1.0); 	
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        gl.viewport(0, 0, canvas.width, canvas.height);
        mat4.perspective(this.projectionMatrix, this.fieldOfViewY, this.aspect, this.near, this.far);
    }

    this.calculateViewMatrix = function(at, eye, up){
        n = math.subtract(eye, at);
        n = math.divide(n, math.norm(n));
        u = math.cross(up, n);
        u = math.divide(u, math.norm(u));
        v = math.cross(n, u);
    
        eyeDotU = -math.dot(eye, u);
        eyeDotV = -math.dot(eye, v);
        eyeDotN = -math.dot(eye, n);
    
        u.push(eyeDotU);
        v.push(eyeDotV);
        n.push(eyeDotN);
    
        var viewMatrix = mat4.fromValues(u[0], u[1], u[2], u[3], v[0], v[1], v[2], v[3], n[0], n[1], n[2], n[3], 0, 0, 0, 1);
        var viewMatrix = mat4.transpose(viewMatrix, viewMatrix);

        return viewMatrix;
    }
}