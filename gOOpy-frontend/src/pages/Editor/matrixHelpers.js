import { Matrix4, Vector3, Euler } from 'three';

export function rebuildMatrix(shapes, index) {
    const s = shapes[index];
    // scale is inverted.. I think this is because we are technically transforming the world and not the shapes.
    // TODO is there a better way to fix this?
    const scale = new Matrix4().scale(
        new Vector3(1 / s.scale.x, 1 / s.scale.z, 1 / s.scale.y)
    );
    const rotate = new Matrix4().makeRotationFromEuler(
        new Euler(s.rotation.x, s.rotation.z, s.rotation.y)
    );
    const translate = new Matrix4().makeTranslation(
        new Vector3().copy(s.center).negate()
    );
    s.transform = scale.multiply(rotate).multiply(translate);
}

export function buildMatrices(shapes) {
    // TODO I can refactor this to make it cleaner but I will do that later...
    shapes.forEach((_, i) => rebuildMatrix(shapes, i));
    return shapes;
}
