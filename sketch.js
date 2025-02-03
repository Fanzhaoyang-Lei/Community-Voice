let proposals = [];
let newProposal = { title: '', description: '' };
let titleInput, descriptionInput, submitButton;

function setup() {
  createCanvas(600, 800);
  textSize(16);

  // Title Input
  titleInput = createInput('');
  titleInput.position(20, 40);
  titleInput.size(200);
  titleInput.attribute('placeholder', 'Proposal Title');

  // Description Input
  descriptionInput = createInput('');
  descriptionInput.position(20, 70);
  descriptionInput.size(200);
  descriptionInput.attribute('placeholder', 'Proposal Description');

  // Submit Button
  submitButton = createButton('Submit Proposal');
  submitButton.position(20, 100);
  submitButton.mousePressed(handleAddProposal);
}

function draw() {
  background(240);

  fill(0);
  text('Community Proposal & Voting App', 20, 20);
  text('Propose a New Plan:', 20, 30);

  let yOffset = 140;
  if (proposals.length === 0) {
    text('No proposals submitted yet.', 20, yOffset);
  } else {
    proposals.forEach((proposal, index) => {
      fill(200);
      rect(20, yOffset, 400, 80);

      fill(0);
      text(`Title: ${proposal.title}`, 30, yOffset + 20);
      text(`Description: ${proposal.description}`, 30, yOffset + 40);
      text(`Votes: ${proposal.votes}`, 350, yOffset + 20);

      let voteButton = createButton('Vote');
      voteButton.position(30, yOffset + 50);
      voteButton.mousePressed(() => handleVote(index));

      yOffset += 100;
    });
  }
}

function handleAddProposal() {
  const title = titleInput.value();
  const description = descriptionInput.value();

  if (title && description) {
    proposals.push({ title, description, votes: 0 });
    titleInput.value('');
    descriptionInput.value('');
  }
}

function handleVote(index) {
  proposals[index].votes += 1;
}
