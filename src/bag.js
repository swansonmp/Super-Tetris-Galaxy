//Int bag. Repeatedly produces random permutations of 1-7. No thinking, just pull.
class bag
{
	constructor()
	{
		this.pulled = 0;
		this.internal = [false, true, true, true, true, true, true, true];
	}
	
	pull()
	{
		while (true) 
		{
			this.temp = Math.floor((Math.random()) * 7) + 1;
			if (this.internal[this.temp])
			{
				this.internal[this.temp] = false;
				this.pulled++;
				if (this.pulled == 7)
				{
					this.pulled = 0;
					this.internal = [false, true, true, true, true, true, true, true];
				}
				return this.temp;
			}
		}
	}
}

