# Cloud concepts and fundamentals

## AWS exam

- Domain1: Cloud Concepts 26%
- Domain2: Security and Compliance 25%
- Domain3: Technology 33%
- Domain4: Billing and Pricing 16%
- Total: 100%

### Resources to keep handy for this module

[Official AWS Certified Cloud Practitioner Exam Guide](https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Exam-Guide.pdf)

[AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)

### The core components require to run your website

1. compute
2. database
3. storage
4. networking
5. security

- The solution
  - in the past
    - do a better job estimating demand
    - invest in more infrastructure
    - hire more people
  - now
    - **move to the cloud**
    - pay for what you use

- Foundational Services
  - compute: EC2 (elastic compute cloud)
  - database: RDS (relational database service)
  - storage: S3 (simple storage service)
  - networking: VPC (virtual private cloud)
  - security: IAM (identity and access management)

- Total Cost of Ownership (TCO)
  - Up-front const(capital expense: CapEx) + cost to operate(operation expense: OpEx)

- Ways to reduce costs in AWS
  - right-sized infrastructure
  - automation
  - compliance scope
  - managed services

- AWS Well-Architected framework
  - Cloud Architected Design Principle
    1. Design for failure
      "Everything fails all the time." - Werner Vogels (AWS Chief Technology Officer)
    2. Decouple components
      Loose coupling, like: Micro Services, Queue
    3. Implement elasticity
      can scale quickly, like: database, server
    4. Think parallel
      1 server run 24 hours or 24 servers run 1 hour

- Important Points to Remember
  - Benefits
    - Global reach: data centers around the world
    - High availability: continue functioning even when one component (server, data center, etc.) goes down
    - Cost saving: reduces up-front costs("CapEx") and ongoing costs("OpEx")
      - Only pay for what you use
      - Right-sizing infrastructure means you don't have to "guess" capacity
      - Managed services reduce your IT overhead/spend
  - Design Principles
    - Design for failure: assume things will fail, and architect for that
    - Loose coupling: reduces the dependencies between components
    - Elasticity: ability to scale resources up and down based on needs
    - Reliability: perform an intended function correctly and consistently when expected to
    - [Review the Well-Architected Framework](http://docs.aws.amazon.com/wellarchitected/latest/framwork/welcome.html)
