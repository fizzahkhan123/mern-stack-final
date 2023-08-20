import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

export default function ProductTable({ CreateFunction }) {
  const [data, setData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newProductName, setNewProductName] = useState("");
  const [newProductCatogary, setNewProductCategory] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductImage, setNewProductImage] = useState("");

  const handleEdit = (item) => {
    setSelectedItem(item);
    setNewProductName(item.productName);
    setNewProductCategory(item.productCategory);
    setNewProductPrice(item.productPrice);
    setNewProductImage(item.productImage);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const createProduct = async (
    productName,
    productPrice,
    productCategory,
    productImage
  ) => {
    const response = await axios.post("http://localhost:3500/api/product", {
      productName,
      productCategory,
      productPrice,
      productImage,
    });

    if (response.status === 200 || response.status === 201) {
      console.log("create item msg", response.data);
    }
  };

  const deleteProduct = async (param) => {
    const response = await axios.delete("http://localhost:3500/api/product", {
      params:{
        "id": param
      }
    });
    
    if (response.status === 200 || response.status === 201) {
      console.log("deleted product", response.data);
    }
  }

  const updateProject = () => {
    
  } 

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/products");

      if (response.status === 200 || response.status === 201) {
        console.log("I have got items", response.data);
        setData(response.data?.products);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = () => {
    if (selectedItem) {
      const updatedData = data.map((item) =>
        item.id === selectedItem.id ? { ...item, name: newItemName } : item
      );
      setData(updatedData);
    } else {
      const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      const newItem = {
        id: newId,
        productName: newProductName,
        productCategory: newProductCatogary,
        productPrice: newProductPrice,
        productImage: newProductImage,
      };
      setData([...data, newItem]);
    }

    setSelectedItem(null);
    setNewProductName("");
    setNewProductCategory("");
    setNewProductPrice("");
    setNewProductImage("");
    setShowModal(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((item, i) => (
              <tr key={item._id}>
                <td>{item.ProductName}</td>
                <td>{item.ProductCategory}</td>
                <td>{item.ProductPrice}</td>
                <td>
                  <img
                    src={item.ProductImage}
                    height={200}
                    width={200}
                    alt="no image"
                  />
                </td>
                <td className="tableActionColumn">
                  <Button variant="primary" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={{ textAlign: "center" }} colSpan={5}>
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Button variant="success" onClick={() => setShowModal(true)}>
        Add New Item
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedItem ? "Edit Item" : "Add New Item"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="form-body">
          <Form.Control
            type="text"
            placeholder="Product Name"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="Product Cateogory"
            value={newProductCatogary}
            onChange={(e) => setNewProductCategory(e.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="Product Price"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="Product Image"
            value={newProductImage}
            onChange={(e) => setNewProductImage(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
