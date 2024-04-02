import Jobcards from "../components/Jobcards";
import PageHeader from "../components/PageHeader";

function Career() {
  return (
    <div>
      <PageHeader />
      <div className="p-10 flex flex-col gap-4 lg:px-72">
        <h3 className="text-2xl font-bold text-gray-500">Sales</h3>
        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
          <Jobcards title="Account Manager" location="Saudi Arabia" />
          <Jobcards title="Business Consultant" location="Saudi Arabia" />
          <Jobcards title="Sales Representative" location="Saudi Arabia" />
          <Jobcards title="Indoor Sales" location="Saudi Arabia" />
          <Jobcards title="Sales Engineer" location="Saudi Arabia" />
        </div>
      </div>

      <div className="p-10 flex flex-col gap-4 lg:px-72">
        <h3 className="text-2xl font-bold text-gray-500">Finance</h3>
        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
          <Jobcards title="Revenue Accoutant" location="Saudi Arabia" />
          <Jobcards title="Regional Facility Manager" location="Saudi Arabia" />
          <Jobcards title="Sr. Accountant" location="Saudi Arabia" />
        </div>
      </div>

      <div className="p-10 flex flex-col gap-4 lg:px-72">
        <h3 className="text-2xl font-bold text-gray-500">Marketing</h3>
        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
          <Jobcards title="Digital Marketing Manager" location="UAE" />
          <Jobcards title="Digital Marketing Executive" location="Saudi Arabia" />
        </div>
      </div>
    </div>
  );
}

export default Career;
