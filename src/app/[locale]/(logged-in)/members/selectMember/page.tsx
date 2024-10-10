import React from "react";
import SelectMembership from "@/app/[locale]/membership/SelectMembership";
import { ServiceProvider } from "@/app/components/providers/service.provider";

const SelectMember = async () => {
  
  const { membershipService } = ServiceProvider.getInstance().getServices();
  const { memberships } = await membershipService.getMemberships();

  return <SelectMembership listPlans={memberships} />;
};

export default SelectMember;
