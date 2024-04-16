import React from "react";
import PageHeader from "../../layout/PageHeader";
import SideBar from "../../layout/manage-account/SideBar";

const ManageAccount = () => {
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Manage Your Nuaris Account" />
      </header>
      <div className="row m-0">
        <div className="col-lg-4 col-12 p-2">
          <SideBar />
        </div>
        <div className="col-lg-8 col-12 p-2">
            oo
        </div>
      </div>
    </section>
  );
};

export default ManageAccount;
