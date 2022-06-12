import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Header, Icon, Modal, Form } from "semantic-ui-react";

import { addMetric } from "../redux/actions/metrics";

const AddMetricModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Temperature");
  const [value, setValue] = useState(0);

  const dispatch = useDispatch();

  const handleAddMetric = () => {
    const metric = {
      value: Number(value),
      name,
    }
    dispatch(addMetric(metric));
    setOpen(false);
  }

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button color="teal">Add Metric</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header content="Add Metric" />
      <Modal.Content>
      <Form size="large">
            <Form.Input
              fluid
              placeholder="Name"
              value={name}
              disabled
              onChange={(event) => setName(event.target.value)}
            />
            <Form.Input
              fluid
              placeholder="0"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button primary onClick={() => handleAddMetric()}>
          <Icon name="plus" /> Add
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddMetricModal;
