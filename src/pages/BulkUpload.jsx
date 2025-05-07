import Reactm, {useState} from 'react'
import { CustomButton } from 'react-mui-tailwind';
import BulkTemplateIcon from "../assets/bulk-template-icon.svg";
import VerticalStepper from '../utils/VerticalStepper';
import { Typography } from "@mui/material";



function BulkUpload() {

    const [activeStep, setActiveStep] = useState(0);

    const steps = [
      {
        label: "Upload Excel File to Import Leads",
      },
      {
        label: "Configure which columns to include in the upload",
      },
      {
        label: "Statics of upload",
      },
    ];

    const handleFinish = () => {
        console.log("Import process complete");
        // Redirect, close modal, show success message, etc.
      };
      
  return (
<>
    <div className='flex flex-row justify-around mt-75px'>  
            <div>
            <VerticalStepper
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            onFinish={handleFinish}
            />
            </div>
            
            <div>
            <a href="\Bulk_Upload_Template.xlsx" download>
                <CustomButton 
                text="Download template file" 
                variant="secondary" 
                endIcon={false}
                iconImg={BulkTemplateIcon}
                width="225px"
                //   onClick={handleDownload}
                />        
                </a>
            </div>

      {/* <h1>Bulk Upload</h1> */}
    </div>
    </>
  )
}

export default BulkUpload
