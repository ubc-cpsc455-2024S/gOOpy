import { Matrix4, Vector3, Euler } from 'three';

export function rebuildMatrix(shape) {
    // scale is inverted.. I think this is because we are technically transforming the world and not the shapes.
    // TODO is there a better way to fix this?
    const scale = new Matrix4().scale(
        new Vector3(1 / shape.scale.x, 1 / shape.scale.z, 1 / shape.scale.y)
    );
    const rotate = new Matrix4().makeRotationFromEuler(
        new Euler(shape.rotation.x, shape.rotation.z, shape.rotation.y)
    );
    const translate = new Matrix4().makeTranslation(
        new Vector3().copy(shape.translation).negate()
    );
    shape.transform = scale.multiply(rotate).multiply(translate);
}

export function buildMatrices(shapes) {
    // TODO I can refactor this to make it cleaner but I will do that later...
    shapes.forEach((shape) => rebuildMatrix(shape));
    return shapes;
}
