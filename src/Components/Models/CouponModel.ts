class CouponModel{
public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public imageName: string;
    public image: File | FileList;
}

export default CouponModel;