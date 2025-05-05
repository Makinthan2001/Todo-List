import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const Content = () => {
  let [data, setdata] = useState([]);
  let [newData1, setNewData1] = useState("");
  let [newData2, setNewData2] = useState("");
  let [Editing, setEditing] = useState(false);
  let [currId, setCurrId] = useState(null);

  function handleDelete(id) {
    setdata(
      data
        .filter((data) => {
          return data.id !== id;
        })
        .map((data, index) => {
          return { ...data, id: index + 1 };
        })
    );
  }

  function handleAddorSave(id) {
    if (Editing) {
      setdata(
        data.map((data) => {
          return data.id === currId
            ? { ...data, name: newData1, pno: newData2 }
            : data;
        })
      );
      setEditing(false)
      setCurrId(null)
      setNewData1("")
      setNewData2("")
    } else {
      setdata([
        ...data,
        { id: data.length + 1, name: newData1, pno: newData2 },
      ]);
      setNewData1("");
      setNewData2("");
    }
  }
  function handleUpdate(id) {
    setCurrId(id);
    setEditing(true);
    setNewData1(
      data.find((data) => {
        return data.id === id;
      }).name
    );
    setNewData2(
      data.find((data) => {
        return data.id === id;
      }).pno
    );
  }

  return (
    <main>
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="box1 col-12 col-lg-6 card">
            <form action="">
              <div class="form-group mt-2">
                <label for="">Name</label>
                <input
                  class="box2 form-control"
                  type="email"
                  value={newData1}
                  onChange={(e) => {
                    setNewData1(e.target.value);
                  }}
                  name=""
                  id=""
                  placeholder="Enter Name"
                />
              </div>
              <div class="form-group mt-2">
                <label for="">Phone No</label>
                <input
                  class="box2 form-control"
                  type="number"
                  value={newData2}
                  onChange={(e) => {
                    setNewData2(e.target.value);
                  }}
                  name=""
                  id=""
                  placeholder="Enter Phone No"
                />
              </div>
              <button
                type="button"
                class="btn btn-primary my-3"
                onClick={() => {
                  handleAddorSave(data.id);
                }}
              >
                {Editing ? "Save" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="row p-5 g-3">
        {data.map((data) => {
          return (
            <div
              key={data.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 mb-4"
            >
              <div className="box3 card text-center shadow-sm">
                <div className="card-body d-flex flex-column align-items-center">
                  <b>{data.name}</b>
                  <p className="mt-1 text-muted">{data.pno}</p>
                  <div>
                    <FaEdit
                      role="button"
                      tabIndex={0}
                      className="editbtn me-3 text-primary"
                      onClick={() => {
                        handleUpdate(data.id);
                      }}
                    />
                    <FaTrashAlt
                      role="button"
                      tabIndex={0}
                      className="delbtn text-danger"
                      onClick={() => {
                        handleDelete(data.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Content;
