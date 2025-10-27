import React from "react";

import { DAY_MAP_KR, DAY_OF_WEEK } from "@/lib/constants/date";

import { Form } from "../Form";

export default function RegularDateTimeField() {
  return (
    <Form.Field
      name="days"
      render={({ field }) => (
        <Form.Item className="flex-1">
          <Form.Label required className="text-lg font-semibold">
            모임 날짜
          </Form.Label>
          <Form.Control>
            <Form.Checkbox
              name="days"
              options={DAY_OF_WEEK.map((day) => ({
                id: day,
                label: DAY_MAP_KR[day],
                value: day,
              }))}
              value={field.value || []}
              onChange={field.onChange}
              className="flex gap-1"
            />
          </Form.Control>
          <Form.Message />
        </Form.Item>
      )}
    />
  );
}
