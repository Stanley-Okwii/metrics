import React from "react";
import { Button, Header, Icon, Modal, Form } from "semantic-ui-react";

const AddMetricModal = () => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [value, setValue] = React.useState(0);

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
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Input
              fluid
              placeholder="0"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="primary" onClick={() => setOpen(false)}>
          <Icon name="plus" /> Add
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddMetricModal;
