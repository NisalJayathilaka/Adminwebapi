import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      ImgPath:'',
      searchVal:'',
      ErrorMsg:'',
      toastTheme:'',
      ImgfileType:'file',
      SubmitBtnType:'SUBMIT'
    }
   
  }

  componentDidMount(){
    axios.get('http://localhost:4000/products/filter/all')
    .then((res)=>{
      this.setState({
        products:res.data,
        id:0,
        Title:'',
        Description:'',
        Price:'',
        ImgPath:'',
        searchVal:'',
        ErrorMsg:'',
        toastTheme:'',
        ImgfileType:'file',
        SubmitBtnType:'SUBMIT'
      })
        
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
  searchChange=event=>{
    this.setState({
      searchVal:event.target.value
    })
  }

  searchByTitle(){
    let param=this.state.searchVal
    axios.get(`http://localhost:4000/products/filter/${param}`)
    .then((res)=>{
      this.setState({
        products:res.data
      })})
  }

  reset(){
    this.componentDidMount()
  }

  submit(event,id){
    let file=this.state.ImgPath
    let formData=new FormData()

    formData.append('ImgPath',file)
    formData.append('Title',this.state.Title)
    formData.append('Description',this.state.Description)
    formData.append('Price',this.state.Price)
    event.preventDefault(); 
   

    if(id===0){
      axios({
        url:`http://localhost:4000/products/`,
        method:"POST",
        headers: { 'content-type': 'multipart/form-data' },
        data:formData
      })
      .then((res)=>{
        this.setState({
          ErrorMsg:res.data
        })
        if(res.data!=='success'){
          this.setState({
            toastTheme:toast.TYPE.ERROR
          })
        }
        else{
          this.setState({
            toastTheme:toast.TYPE.SUCCESS
          })
        }
        this.notify()
        this.componentDidMount()
      }).catch((err)=>{
        console.log(err)
      })
    }
    else{
      axios({
        url:`http://localhost:4000/products/${id}`,
        method:"PUT",
        headers: { 'content-type': 'multipart/form-data' },
        data:formData
      })
      .then((res)=>{
        this.setState({
          ErrorMsg:res.data
        })
        if(res.data!=='success'){
          this.setState({
            toastTheme:toast.TYPE.ERROR
          })
        }
        else{
          this.setState({
            toastTheme:toast.TYPE.SUCCESS
          })
        }
        this.notify()
        this.componentDidMount()
      }).catch((err)=>{
        console.log(err)
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
      this.setState({
        id:res.data._id,
        ImgPath:newimgUrl,
        Title:res.data.Title,
        Description:res.data.Description,
        Price:res.data.Price,
        ImgfileType:'hidden',
        SubmitBtnType:'UPDATE'
      })
    })
  }

  notify = () => toast(this.state.ErrorMsg,{type: this.state.toastTheme});
  render(){
  return (
    <div className="row">
    <ToastContainer />   
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
        <img src={this.state.ImgPath} ></img>
        <div className="input-field col s12">
          
          <input onChange={(e)=>this.fileChange(e)} type={this.state.ImgfileType} id="autocomplete-input" className="autocomplete"  />
        </div>
        <button className="btn waves-effect waves-light right" type="submit" name="action">{this.state.SubmitBtnType}
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
    <input value={this.state.searchVal} onChange={(e)=>this.searchChange(e)} type="text" id="autocomplete-input" className="autocomplete"  />
    <button onClick={(e)=>this.searchByTitle()} className="btn waves-effect waves-light" type="submit" name="action">
                <i className="material-icons">search</i>
    </button>
    <button onClick={(e)=>this.reset()} className="btn waves-effect waves-light" type="submit" name="action">
                <i className="material-icons">cached</i>
    </button>
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