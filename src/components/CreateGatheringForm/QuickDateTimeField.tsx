import React from "react";

import { Form } from "../Form";

export default function QuickDateTimeField() {
  return (
    <Form.Field
      name="dateTime"
      render={({ field }) => (
        <Form.Item className="flex-1">
          <Form.Label required className="text-lg font-semibold">
            모임 날짜 및 시간
          </Form.Label>
          <Form.Control>
            <Form.Input
              type="datetime-local"
              placeholder="모임 날짜와 시간을 선택해주세요"
              className="w-full rounded-xl bg-[#edf4fb] px-4 py-2.5"
              {...field}
            />
          </Form.Control>
          <Form.Message />
        </Form.Item>
      )}
    />
  );
}
