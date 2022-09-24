import Minio from 'minio';

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENPOIN || '127.0.0.1',
    port: process.env.MINIO_PORT || 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
    // region: process.env.MINIO_REGION,
    
});

const uploadImage = async (bucket, file) => {
    const arrayExt = ['image/png', 'image/jpg', 'image/jpeg'];
    if (!arrayExt.includes(file.mimetype.toLocaleLowerCase())) {
        throw new Error('Format error file ');
    }
    const isBucket = await minioClient.bucketExists(bucket);

    let uploaded = null;
    if (!isBucket) {
        minioClient.makeBucket(bucket, 'ap-northeast-1', function (err) {
            if (err) throw new Error('Can not Create bucket');
        });
    }

    uploaded = await upload(bucket, file);
    return uploaded;
};

const upload = async (bucket, file) => {
    const random = Math.floor(Math.random() * 1000000);
    const path = String(random) + file.name;

    const metaData = {
        'Content-Type': 'application/octet-stream',
        'X-Amz-Meta-Testing': 1234,
    };

    const uploaded = await minioClient.putObject(bucket, path, file.data, metaData);
    if (!uploaded) {
        throw new Error('Can not upload image');
    }
    const getPathImage = await minioClient.presignedGetObject(bucket, path);
    return getPathImage;
};
export default uploadImage;
