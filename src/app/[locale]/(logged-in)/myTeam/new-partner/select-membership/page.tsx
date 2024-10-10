import React from "react";
import SelectMembership from "@/app/[locale]/membership/SelectMembership";
import { ServiceProvider } from "@/app/components/providers/service.provider";

const SelectMemberPage = async () => {

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

export default SelectMemberPage;
