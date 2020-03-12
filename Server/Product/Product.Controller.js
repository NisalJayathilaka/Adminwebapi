const mongoose = require('../DBSchema/SchemaMapper');
const Products = mongoose.model('products');

var ProductController = function(){

    this.Insert = (data1)=>{
        var data=data1.body;
        if(data.ImgPath !=='' && data.Price !=='' && data.Title !=='' && data.Description !==''){
            if(!isNaN(data.Price)){
                return new Promise((resolve,reject)=>{
                    let products = new Products({

                        ImgPath:data1.file.path,
                        Title:data.Title,
                        Description:data.Description,
                        Price:data.Price

                    });
                    products.save().then(()=>{
                        resolve({status:200,message:{success:true,data:data}});
                    }).catch((err)=>{
                        reject({status:500,message:'product creation failed due to Error: '+err});
                    });
                })
            }
            else{
                return new Promise((resolve,reject)=>{
                    reject({status:500,message:'Price Error'});
                })
            }
        }
        else{
            return new Promise((resolve,reject)=>{
                reject({status:500,message:'empty Error'});
            })
        }
    };

    this.retrieve = ()=>{
            return new Promise((resolve,reject)=>{
                Products.find().then((data)=>{
                    resolve({status:200,message:{success:true,data:data}});
                }).catch((err)=>{
                    reject({status:500,message:'No data to be found. Error: '+err});
                })
            })
           };

    
    this.retrieveByID = (id)=>{
        return new Promise((resolve,reject)=>{
            Products.findById(id).then((data)=>{
                resolve({status:200,message:data});
            }).catch((err)=>{
                reject({status:500,message:'No data to be found. Error: '+err});
            })
        });
    };

    this.update = (id,data)=>{
        return new Promise((resolve,reject)=>{

            let products = {
                ImgPath:data.ImgPath,
	            Title:data.Title,
                Description:data.Description,
                Price:data.Price
            };
            products.findByIdAndUpdate({_id: id},products).then(()=>{
                resolve({status:200,message:{success:true}});
            }).catch((err)=>{
                reject({status:500,message:'Products updating failed due to Error: '+err});
            });
        })
    };

    this.delete = (id)=>{
        return new Promise((resolve,reject)=>{
            Products.findByIdAndDelete(id).then(()=>{
                resolve({status:200,message:{success:true}});
            }).catch((err)=>{
                reject({status:500,message:'No data to be found. Error: '+err});
            })
        });
    }

};

module.exports = new ProductController();