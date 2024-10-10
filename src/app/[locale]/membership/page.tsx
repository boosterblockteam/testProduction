import React from "react";
import SelectMembership from "./SelectMembership";
import { ServiceProvider } from "@/app/components/providers/service.provider";

const MembershipPage = async () => {

  try {
    
    const { membershipService } = ServiceProvider.getInstance().getServices();
    const { memberships } = await membershipService.getMemberships();
  
    return (
      <>
        <SelectMembership listPlans={memberships} />
      </>
    );

  } catch (error) {
    return <div>Error with server</div>
  }

};

export default MembershipPage;
