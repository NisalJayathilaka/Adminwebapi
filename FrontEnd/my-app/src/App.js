import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      products:[],
      id:'',
      Title:'',
      Description:'',
      Price:'',
      ImgPath:''
    }
  }
  componentDidMount(){
    axios.get('http://localhost:4000/products')
    .then((res)=>{
      this.setState({
        products:res.data,
        id:0,
        Title:'',
        Description:'',
        Price:'',
        ImgPath:''
      })
          console.log(res.data);
    }
    )
  }

  titleChange=event=>{
    this.setState({
      Title:event.target.value
    })
  }

  descriptionChange=event=>{
    this.setState({
      Description:event.target.value
    })
  }
  priceChange=event=>{
    this.setState({
      Price:event.target.value
    })
  }

  fileChange=event=>{
    let file=event.target.files[0]
    this.setState({
      ImgPath:file
    })
  }

  submit(event,id){

    let file=this.state.ImgPath
    let formData=new FormData()

    formData.append('ImgPath',file)
    formData.append('Title',this.state.Title)
    formData.append('Description',this.state.Description)
    formData.append('Price',this.state.Price)
    console.log(this.state)
    event.preventDefault(); 


    if(id===0){
    
      axios({
        url:'http://localhost:4000/products',
        method:"POST",
        headers: { 'content-type': 'multipart/form-data' },
        data:formData
      })
      .then(()=>{
        this.componentDidMount()
      })
    }
    else{
      axios({
        url:`http://localhost:4000/products/${id}`,
        method:"POST",
        headers: { 'content-type': 'multipart/form-data' },
        data:formData
      })
      .then(()=>{
        this.componentDidMount()
      })
    }
  }

  delete(id){
    axios.delete(`http://localhost:4000/products/${id}`)
    .then(()=>{
      this.componentDidMount()
    })
  }
 
  edit(id){
   
    axios.get(`http://localhost:4000/products/${id}`)
    .then((res)=>{
      var imgUrl = `http://localhost:4000/${res.data.ImgPath}`;
      var newimgUrl=imgUrl.replace("Product/","");
      console.log(newimgUrl)
      this.setState({
        ImgPath:newimgUrl,
        Title:res.data.Title,
        Description:res.data.Description,
        Price:res.data.Price
      })
    })
  }

  render(){
  return (
    <div className="row">
    <div className="col s6">
      <form onSubmit={(e)=>this.submit(e,this.state.id)}>
        <div className="input-field col s12">
          
          <input value={this.state.Title} onChange={(e)=>this.titleChange(e)} type="text" id="autocomplete-input" className="autocomplete"  />
          <label htmlFor="autocomplete-input">Title</label>
        </div>
        <div className="input-field col s12">
         
          <input value={this.state.Description} onChange={(e)=>this.descriptionChange(e)} type="text" id="autocomplete-input" className="autocomplete"  />
          <label htmlFor="autocomplete-input">Description</label>
        </div>
        <div className="input-field col s12">
         
          <input value={this.state.Price} onChange={(e)=>this.priceChange(e)} type="text" id="autocomplete-input" className="autocomplete"  />
          <label htmlFor="autocomplete-input">Price</label>
        </div>
        <img src={this.state.ImgPath} alt="Girl in a jacket"></img>
        <div className="input-field col s12">
          
          <input onChange={(e)=>this.fileChange(e)} type="file" id="autocomplete-input" className="autocomplete"  />
        </div>
        <button className="btn waves-effect waves-light right" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
        </button>
      </form>

   
      <button data-target="modal12" className="btn modal-trigger">Modal</button>


  <div id="modal12" className="modal">
    <div className="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div className="modal-footer">
      <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
          

    </div>
    <div className="col s6">
    <table>
        <thead>
          <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>View</th>
              <th>Edit</th>
              <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {this.state.products.map(product=>
            <tr key={product._id}>
            <td>{product.Title}</td>
            <td>{product.Description}</td>
            <td>{product.Price}</td>
            <td> 
            <button onClick={(e)=>this.edit(product._id)} className="btn waves-effect waves-light" type="submit" name="action">
                <i className="material-icons">visibility</i>
            </button>
            </td>
            <td> 
            <button onClick={(e)=>this.edit(product._id)} className="btn waves-effect waves-light" type="submit" name="action">
                <i className="material-icons">edit</i>
            </button>
            </td>
            <td>
            <button onClick={(e)=>this.delete(product._id)} className="btn waves-effect waves-light" type="submit" name="action">
                <i className="material-icons">delete</i>
            </button>
            </td>
          </tr>
            )}
          
        </tbody>
      </table>
    </div>
    
    </div>
  );
}
}
export default App;
