import React from "react";

import AppHeader from "@saleor/components/AppHeader";
import CardSpacer from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import i18n from "../../../i18n";
import { UserError } from "../../../types";
import {
  VoucherDiscountValueType,
  VoucherType
} from "../../../types/globalTypes";
import VoucherInfo from "../VoucherInfo";
import VoucherOptions from "../VoucherOptions";

export interface FormData {
  applyOncePerOrder: boolean;
  code: string;
  discountType: VoucherDiscountValueType;
  endDate: string;
  minAmountSpent: number;
  name: string;
  startDate: string;
  type: VoucherType;
  usageLimit: number;
  value: number;
}

export interface VoucherCreatePageProps {
  defaultCurrency: string;
  disabled: boolean;
  errors: UserError[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: FormData) => void;
}

const VoucherCreatePage: React.StatelessComponent<VoucherCreatePageProps> = ({
  defaultCurrency,
  disabled,
  errors,
  saveButtonBarState,
  onBack,
  onSubmit
}) => {
  const initialForm: FormData = {
    applyOncePerOrder: false,
    code: "",
    discountType: VoucherDiscountValueType.FIXED,
    endDate: "",
    minAmountSpent: 0,
    name: "",
    startDate: "",
    type: VoucherType.ENTIRE_ORDER,
    usageLimit: 0,
    value: 0
  };

  return (
    <Form errors={errors} initial={initialForm} onSubmit={onSubmit}>
      {({ change, data, errors: formErrors, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>{i18n.t("Vouchers")}</AppHeader>
          <PageHeader title={i18n.t("Create Voucher")} />
          <Grid>
            <div>
              <VoucherInfo
                data={data}
                errors={formErrors}
                disabled={disabled}
                variant="create"
                onChange={change}
              />
              <CardSpacer />
              <VoucherOptions
                data={data}
                disabled={disabled}
                defaultCurrency={defaultCurrency}
                errors={formErrors}
                onChange={change}
              />
              <CardSpacer />
            </div>
          </Grid>
          <SaveButtonBar
            disabled={disabled || !hasChanged}
            onCancel={onBack}
            onSave={submit}
            state={saveButtonBarState}
          />
        </Container>
      )}
    </Form>
  );
};
VoucherCreatePage.displayName = "VoucherCreatePage";
export default VoucherCreatePage;