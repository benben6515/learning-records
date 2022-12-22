# Security and Compliance

“Train yourself to let go of everything you fear to lose.”

- Yoda, Star Wars: Revenge Of The Sith, when he was training Luke Skywalker about AWS Security and Compliance on Dagobah

Resources to keep handy for this module:

[Official AWS Certified Cloud Practitioner Exam Guide](https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Exam-Guide.pdf)

[AWS Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model)

[AWS Security, Identity and Compliance Products](https://aws.amazon.com/products/security)

## AWS Shared Responsibility Model

- Infrastructure as a Service (IaaS)
- Platform as a Service (PaaS)
- Software as a Service (SaaS)

![IaaS, PaaS, SaaS illustration](https://i.imgur.com/gxMjfAJ.png)

> image from in the course

## Identity and Access Management (IAM)

> Service used to securely control access to your AWS Resources
> Control authentication (who) and authorization (what they can do)

- IAM Users
  - console > Users > `Add users`
  - Root User
    - One per account
    - Unrestricted access
    - Difficult to restrict or revoke access
    - Can perform the following tasks: Close an AWS account, Change an AWS support plan, Change AWS account settings
  - IAM User
    - Multiple per account
    - Users can be deleted or disabled
    - Easy to restrict access
  - Best Practice
    - Always work in your IAM account, not the root account
    - Set up IAM users with least number of permissions needed

- IAM User group
  - console > Users > `Add users`

- IAM Roles
- IAM Policies
- Multi-Factor Authentication(MFA)
