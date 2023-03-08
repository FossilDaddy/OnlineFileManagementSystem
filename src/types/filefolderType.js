export class S3Object {
    constructor(objectKey, objectName, objectSize, objectType) {
        this.key = objectKey;
        this.name = objectName;
        this.size = objectSize;
        this.type = objectType;
    }
}