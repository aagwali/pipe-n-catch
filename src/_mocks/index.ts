export const mockResponse = {
  response: {
    status: 203,
    what: "",
    data: {
      id: 111,
      product_family_id: 12345,
      type_id: "Det",
      number: 1,
      dam_view: [
        { document_uuid: "5b4887bf0a383e16c887b2a7" },
        { document_uuid: "5b4887c10a383e16c887b2a9" },
      ],
    },
  },
}

export const defaultValue = {
  respone: {
    status: 203,
    data: {
      type_id: "DEFAULT",
      id: 999,
      product_family_id: 98765,
      number: 5,
      dam_view: [{ document_uuid: "5b4887c10a383e16c887b2a9" }],
    },
  },
}
