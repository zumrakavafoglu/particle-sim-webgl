function Light(lightType = LightType.Directional){
    
    this.type = lightType;

    if(this.type == LightType.Directional || this.type == LightType.Spot){
        this.direction = [1, 0, 0];
    }
    else if(this.type == LightType.Point || this.type == LightType.Spot){
        this.position = [0, 1, 0];
        this.k1 = 1.0;
        this.k2 = 1.0;
        this.k3 = 1.0;
    }

    window.light = this;

    this.diffuseColor = [1.0 , 1.0 , 1.0 , 1.0];

    this.specularColor = [1.0 , 1.0 , 1.0 , 1.0];
    
    this.ambientColor = [0.2 , 0.2 , 0.2 , 1.0];

    this.sendLightTransformInfo = function(camera, program){
        if(this.type == LightType.Directional || this.type == LightType.Spot){
            var direction4 = [-this.direction[0], -this.direction[1], -this.direction[2], 0];
            mat4.multiply(direction4, camera.viewMatrix, direction4);
            var direction3 = [direction4[0],direction4[1],direction4[2]];
            program.setUniform3fv("uInverseLightDirection", direction3);
        }
        else if(this.type == LightType.Point || this.type == LightType.Spot){
            program.setUniform3fv("uLightPosition", this.position);
            program.setUniform1f("k1",this.k1);
            program.setUniform1f("k2",this.k2);
            program.setUniform1f("k3",this.k3);
        }
    }
}

window.LightType = {
    Directional : 0,
    Point : 1,
    Spot : 2
};